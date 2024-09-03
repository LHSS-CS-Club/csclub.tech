import React, { useEffect, useState } from 'react';
import usePocketbase from '../hooks/usePocketbase';
import { toast } from 'sonner';

// Define the type for a lesson
interface Lesson {
  title: string;
  description: string;
  date: string;
  type: 'lesson' | 'challenge' | 'combined';
  slideshow: string;
}

interface AccumulatorType {
  lessonRecords: Lesson[];
  challengeRecords: Lesson[];
  combinedRecords: Lesson[];
}

const Lessons: React.FC = () => {
  const pocketbase = usePocketbase();

  const [LR, setLR] = useState<Lesson[]>([]);
  const [CR, setCR] = useState<Lesson[]>([]);
  const [CB, setCB] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        let lessons = []
        const records = await pocketbase.collection('lessons').getFullList<Lesson>();
        lessons = records;

        console.log(lessons);

        const { lessonRecords, challengeRecords, combinedRecords } = lessons.reduce<AccumulatorType>(
          (acc, record) => {
            if (record.type === "lesson") acc.lessonRecords.push(record);
            else if (record.type === "challenge") acc.challengeRecords.push(record);
            else if (record.type === "combined") acc.combinedRecords.push(record);
            return acc;
          },
          { lessonRecords: [], challengeRecords: [], combinedRecords: [] }
        );
        
        setLR(lessonRecords);
        setCR(challengeRecords);
        setCB(combinedRecords);
                setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch lessons');
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) return <div>Loading...</div>;

  const rooms = [
    { title: 'Lesson Room', lessons: LR },
    { title: 'Challenge Room', lessons: CR },
    { title: 'Combined', lessons: CB },
  ] as { title: string; lessons: Lesson[] }[];

  return (
    <div>
      <h1>Lessons</h1>
      <p>View all previous CS Club lessons here!</p>
      <div className='flex flex-col gap-8 mt-8'>
        {rooms.map((room, id) => (
          <div key={`lessons-room-${id}`}>
            <h2 className='text-xl font-bold'>{room.title}</h2>
            <div className='grid gap-4 mt-4'>
              {
                (room.lessons.length === 0) ? <p>No lessons found.</p> : null
              }
              {room.lessons.map((lesson, id) => (
                <div key={`lesson-${id}`}>
                  <LessonCard 
                    title={lesson.title}
                    description={lesson.description}
                    date={lesson.date}
                    type={lesson.type}
                    slideshow={lesson.slideshow}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LessonCard = (props: Lesson) => (
  <div className="bg-neutral-800 p-4 rounded-lg max-w-[35rem]">
    <iframe src={props.slideshow} width="480" height="299" className='mx-auto' allowFullScreen={true} />
    <div className='flex items-center justify-between mt-4'>
      <h3 className="text-lg font-semibold mb-2">{props.title}</h3>
      {new Date(props.date).toLocaleDateString()}
    </div>
    <p className="mb-4">{props.description}</p>
    <span className='bg-blue-500 rounded-md p-1'>{props.type}</span>
  </div>
);

export default Lessons;
