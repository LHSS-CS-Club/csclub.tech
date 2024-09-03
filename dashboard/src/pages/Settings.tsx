import { useState } from "react"
import usePocketbase from "../hooks/usePocketbase"
import { toast } from "sonner"

const Settings = () => {

  const pocketbase = usePocketbase() 

  const [changed, setChanged] = useState(false)
  const [name, setName] = useState(pocketbase.authStore.model?.name || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    pocketbase.collection('users').update(pocketbase.authStore.model?.id, {
      name: name
    });

    setChanged(false)
    toast.success(<div>Profile updated! <button className="text-blue-500 hover:underline" onClick={() => {location.reload()}}>Reload the page.</button></div>);
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Update your profile here.</p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xl font-bold">
            Name
          </label><br/>
          <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value); setChanged(true)}} className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required />
        </div>
        <button type="submit" className={`bg-blue-500 text-white p-2 rounded-lg mt-4 ${(!changed) ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} disabled={!changed}>Update</button>
      </form>
    </div>
  )
}

export default Settings