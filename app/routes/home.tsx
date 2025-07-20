import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "../components/ResumeCard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Draflty"  },
    { name: "description", content: "Smart feedback for your dream Job!" },
  ];
}

export default function Home() {
  const {isLoading, auth} = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate= useNavigate();

  useEffect(() => {
      if(!auth.isAuthenticated) navigate('/auth?next=/')
  }, [auth.isAuthenticated])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
    <Navbar />
    
    <section className="main-section ">
        <div className="page-heading py-16">

          <h1>Track your applications and resume ratings!</h1>
          <h2>Review your submissions and get AI-Powered feedback</h2>
        </div>

        {resumes.length> 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
    )}
    </section>
  </main>;
}
