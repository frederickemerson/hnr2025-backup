"use client"
import Image from "next/image";
import {useEffect, useState} from "react";

const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch('/api/score')
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setLeaderboard(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch leaderboard data:', err);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const renderLeaderboard = () => {
    if (isLoading) {
      return <p className="text-center text-2xl">Loading...</p>;
    }
    if (hasError) {
      return <p className="text-center text-2xl">Error fetching data.</p>;
    }
    if (leaderboard.length === 0) {
      return <p className="text-center text-2xl">No users in leaderboard.</p>;
    }
    return (
      <ul className="list-decimal pl-5">
        {leaderboard.map((user, index) => {
          return (
            <li key={user.id} className="text-xl">
              {user.name} - TIme
            </li>
          )
        })}
      </ul>
    );
  };
  return (

    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 transition-all duration-500"
      >
        <Image
          src="/sp.svg"
          alt="Background pattern"
          fill
          priority
          className="object-cover"
          style={{
            filter: "brightness(100)",
            opacity: 1,
          }}
        />
        <div className="absolute text-black z-10 w-full">
          <div className="flex flex-col justify-center h-screen items-center">
            <div className="p-10 bg-gray-200">
              <h1 className="text-3xl font-bold">Leaderboard</h1>
              <div>
                {renderLeaderboard()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;