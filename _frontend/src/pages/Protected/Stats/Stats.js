import React, { useEffect } from "react";
import { FaLaptop, FaBook, FaFileSignature, FaMarker } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import {
  Loading,
  Question,
  StatsItem,
  StudentsTable
} from "../../../components";

const Stats = () => {
  const { isLoading, stats, getStats } = useAppContext();
  useEffect(() => {
    getStats();
  }, []);
  const defaultAppStats = [
    {
      title: "Programing",
      count: stats.programing || 0,
      icon: <FaLaptop />,
      color: "var(--primary-500)"
    },
    {
      title: "English",
      count: stats.english || 0,
      icon: <FaBook />,
      color: "#25b049"
    },
    {
      title: "Math",
      count: stats.math || 0,
      icon: <FaMarker />,
      color: "#e92999"
    },

    {
      title: "Marketing",
      count: stats.marketing || 0,
      icon: <FaFileSignature />,
      color: "#e90909"
    },

    {
      title: "Cooking",
      count: stats.marketing || 0,
      icon: <FaFileSignature />,
      color: "#e9cc09"
    },

    {
      title: "Swimming",
      count: stats.marketing || 0,
      icon: <FaFileSignature />,
      color: "#e9c6a9"
    }
  ];

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <main>
      <section className="quizStats">
        {defaultAppStats.map((item, index) => {
          return <StatsItem key={index} {...item} />;
        })}
      </section>
    </main>
  );
};

export default Stats;
