import { useEffect, useState } from "react";
import usePocketbase from "../hooks/usePocketbase"
import { RecordModel } from "pocketbase";
import { toast } from "sonner";

const Attendance = () => {

  const pocketbase = usePocketbase();

  const [score, setScore] = useState<number>(0);
  const [placement, setPlacement] = useState<number>(0);
  const [lessons, setLessons] = useState<number>(0);
  const [users, setUsers] = useState<RecordModel[]>([])
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      const records = await pocketbase.collection('users').getFullList();
      records.sort((a, b) => b.attendance - a.attendance);      
      setUsers(records);
      setPlacement(records.findIndex(user => user.id === pocketbase.authStore.model?.id));
    }
    fetchUsers();

    setScore(pocketbase.authStore.model?.attendance);

    const fetchLessons = async () => {
      const lessons = await pocketbase.collection('lessons').getFullList();
      setLessons(lessons.length);
    }
    fetchLessons();
  }, [pocketbase])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const record = await pocketbase.collection('attendance').getOne(import.meta.env.VITE_ATTENDANCE_CODE_ID);
    
    if (parseInt(code) === record.code) {
      if (record.redeemed.includes(pocketbase.authStore.model?.id)) {
        toast.error('You have already redeemed this attendance code.');
        return;
      }
      
      pocketbase.collection('users').update(pocketbase.authStore.model?.id, {
        attendance: pocketbase.authStore.model?.attendance + 1
      });
      pocketbase.collection('attendance').update(record.id, {
        redeemed: [...record.redeemed, pocketbase.authStore.model?.id]
      })

      setCode('');
      toast.success(<div>Attendance code accepted! <button className="text-blue-500 hover:underline" onClick={() => {location.reload()}}>Reload the page.</button></div>);
    } else {
      toast.error('Attendance code is incorrect.');
    }
  };

  return (
    <div>
      <h1>Attendance</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-neutral-800 p-4 rounded-lg max-w-[35rem]">
          <h2>Your Score</h2>
          <p className="text-4xl font-bold mt-2">
            {score}
          </p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg max-w-[35rem]">
          <h2>Your Placement</h2>
          <p className="text-4xl font-bold mt-2">
            {placement+1}
          </p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg max-w-[35rem]">
          <h2>Total Lessons</h2>
          <p className="text-4xl font-bold mt-2">
            {lessons}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h1>Code</h1>
        <p>
          At the end of every CS Club meeting, enter the code shown on the slide here to earn your attendance score for that meeting.
        </p>
        <form 
          onSubmit={handleSubmit} 
          onInvalid={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            form.setCustomValidity("");
            toast.error(`An error occured with the "${form.name}" field.`);
          }}
        >
          <input type="number" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Attendance Code" name="code" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2 w-full" required />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4">Submit</button>
        </form>
      </div>
      <div className="mt-8">
        <h1>Leaderboard</h1>
        <table className="w-full mt-4">
          <thead>
            <tr className="hover:bg-neutral-800 transition-colors">
              <th className="text-left text-neutral-400 py-2 pl-2">Rank</th>
              <th className="text-left text-neutral-400 py-2">Name</th>
              <th className="text-neutral-400 py-2 text-right pr-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-neutral-800 transition-colors">
                  <td className="py-2 w-1/5 pl-2">{index + 1}</td>
                  <td className="py-2 w-3/5">{user.name}</td>
                  <td className="py-2 w-1/5 text-right pr-2">{user.attendance}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance