import { FormEvent, useState } from "react";
import usePocketbase from "../hooks/usePocketbase";
import { Link, useLocation } from "wouter";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const pocketbase = usePocketbase();
    const [, navigate] = useLocation()

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 8) {
            setErrorMsg("Password must be at least 8 characters long.")
            return;
        }
        else if (password.length > 72) {
            setErrorMsg("Password must be less than 72 characters long.")
            return;
        }
        else if (password !== passwordConfirm) {
            setErrorMsg("Passwords do not match.")
            return;
        }

        setIsSubmitting(true);
        setErrorMsg("");

        try {
            await pocketbase.collection('users').create({
                email,
                password,
                passwordConfirm
            });

            navigate('/home')
        }

        catch (error: any) {
            if (error?.status === 400) {
                setErrorMsg("Invalid email or password.")
            }
        }

        setIsSubmitting(false)
    }



    return (
        <div className="flex justify-center items-center h-screen bg-[#0c0d24]">
            <form className="p-8 flex flex-col gap-4 w-1/2 max-w-96 shadow-black rounded-lg" onSubmit={handleSignup}>
                <h2 className="text-[5rem] text-transparent bg-clip-text bg-gradient-to-b to-[#636280] from-white text-center font-[800]">Signup</h2>
                <input className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg" type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors">{isSubmitting ? 'Loading...' : 'Signup'}</button>
                {errorMsg.length > 0 && <span className="text-red-300">{errorMsg}</span>}
                <span className="text-center text-gray-400">Already have an account? <Link href="/login" className="text-blue-400 underline hover:no-underline">Login</Link></span>


            </form>
        </div>
    )
}

export default Signup