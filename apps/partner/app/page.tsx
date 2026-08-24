import React from "react"

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
      <div className="flex gap-4 lg:col-span-4">
        <div className="grid flex-1 gap-1">
          <div className="flex gap-2">
            <span className="text-xl">Welcome!</span>
            <span className="text-xl font-bold">Partner</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:col-span-3 lg:gap-6">
        {/* stats */}
        <div className="hap-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          <div className="h-44 rounded-2xl border bg-linear-to-b from-blue-500 to-blue-300"></div>
          <div className="h-44 rounded-2xl border bg-linear-to-b from-yellow-500 to-yellow-600"></div>
          <div className="h-44 rounded-2xl border bg-linear-to-b from-violet-500 to-indigo-600"></div>
        </div>
        {/*  */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="aspect-[1/0.7] rounded-2xl bg-secondary"></div>
          <div className="aspect-[1/0.7] rounded-2xl bg-secondary"></div>
        </div>

        <div className="h-36 rounded-2xl bg-secondary"></div>
      </div>
      <div className="aspect-[0.5/1] rounded-2xl bg-white">
        <div className="h-40 rounded-2xl border-4 border-primary bg-background"></div>
      </div>
    </div>
  )
}

export default HomePage
