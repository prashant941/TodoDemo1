import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import LoginForm from "./auth/LoginForm";
import { stateMange } from "../types/auth.types";

const Home = () => {
  const isLogin = useSelector(
    (state: stateMange) => state.auth?.isAuthenticated
  );
  const orgId = localStorage.getItem("orgId");
  if (isLogin && orgId) {
    return <Navigate to={"/todo"} />;
  }
  if (isLogin) {
    return <Navigate to={"/switch"} />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <section className="flex-1 py-20 px-6 text-center bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Organize Your Life with{" "}
          <span className="text-blue-600">MujhBeTodo</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Create, track, and manage your daily tasks with ease. Simple, fast,
          and effective.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
          </DialogTrigger>
          <LoginForm />
        </Dialog>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Add Tasks Instantly</h3>
            <p>Quickly jot down anything you need to remember or get done.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
            <p>Group tasks, set deadlines, and manage your day efficiently.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Use Anywhere</h3>
            <p>
              Accessible from mobile, tablet, or desktop — your tasks are always
              with you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
