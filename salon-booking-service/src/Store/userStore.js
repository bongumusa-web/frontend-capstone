import {create } from "zustand";

export const userUserStore = create((set) => ({
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, //store logged-in user
    // login function
    login: (user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        set({ currentUser: user });

    },
    //logging out function
    logout: () => {
        localStorage.removeItem("currentUser");
        set({ currentUser: null });

    },
    // update bookings
    updateBookings: (bookings) =>
        set((state) => ({
            currentUser: {
                ...state.currentUser, bookings
            },
        })),
}));


