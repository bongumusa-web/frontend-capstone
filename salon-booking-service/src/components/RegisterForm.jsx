import { useState } from "react";
import { userUserStore } from "../Store/userStore";

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",

    });
    
    
    const login = userUserStore((state) => state.login); // calling login fuction from zustand
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }


    // handle submit 
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    ...formData,
                    bookings: [],
                }),
            }

        );

        const newUser = await response.json();
        login(newUser);
    };


    return (
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="surname" placeholder="Surname" onChange={handleChange} required />
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" placeholder="Email@gmial.com" onChange={handleChange}  required/>
                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />

                <button type="submit">Register</button>
            </form>


    );
}

export default RegisterForm;

