import Image from "next/image";

const Leaderboard = () => {
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;