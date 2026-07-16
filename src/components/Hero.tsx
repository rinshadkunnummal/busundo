import { useEffect, useState } from "react";

import {
  ArrowRight,
  Bus,
  Clock3,
  Navigation,
  Search,
} from "lucide-react";


const destinations = [
  "Kozhikode",
  "Malappuram",
  "Kottakkal",
  "Perinthalmanna",
  "Calicut Airport",
];


const upcomingBuses = [
  {
    time: "11:35 AM",
    destination: "Kozhikode",
    route: "via Kottakkal",
    status: "12 min",
  },
  {
    time: "12:05 PM",
    destination: "Malappuram",
    route: "via Kottakkal",
    status: "42 min",
  },
];


export default function Hero() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="min-h-screen bg-zinc-50 py-10 font-inter">

      <div className="mx-auto max-w-7xl px-6">


        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="font-sora text-3xl font-bold tracking-tight text-zinc-900">
              Good Morning 👋
            </h1>

            <p className="mt-1 text-zinc-500">
              Find your next bus quickly
            </p>

          </div>


          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>

        </div>




        {/* Dashboard */}

        <div className="grid gap-6 lg:grid-cols-3">



          {/* Next Bus */}

          <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">


            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">

                <Bus className="h-5 w-5 text-emerald-600" />

                Next Bus

              </div>


              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                Arriving soon
              </span>


            </div>





            {/* Main Bus */}

            <div className="mt-6 flex flex-col justify-between gap-6 rounded-3xl bg-emerald-600 p-6 text-white sm:flex-row">


              <div>

                <p className="text-sm text-white/70">
                  Destination
                </p>


                <h2 className="mt-2 font-sora text-4xl font-bold">
                  {upcomingBuses[0].destination}
                </h2>


                <p className="mt-1 text-white/80">
                  {upcomingBuses[0].route}
                </p>


              </div>




              <div className="sm:text-right">

                <p className="font-sora text-4xl font-bold">
                  {upcomingBuses[0].time}
                </p>


                <p className="mt-2 flex items-center gap-2 text-white/80 sm:justify-end">

                  <Clock3 className="h-4 w-4" />

                  {upcomingBuses[0].status}

                </p>


              </div>


            </div>






            {/* Upcoming */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">


              {upcomingBuses.map((bus) => (

                <div
                  key={bus.time}
                  className="rounded-2xl border border-zinc-200 p-4 transition hover:border-emerald-400"
                >


                  <div className="flex items-center justify-between">


                    <div className="flex items-center gap-2">

                      <Clock3 className="h-4 w-4 text-zinc-400" />

                      <span className="font-semibold">
                        {bus.time}
                      </span>

                    </div>


                    <span className="text-sm text-zinc-500">
                      {bus.status}
                    </span>


                  </div>


                  <p className="mt-3 text-zinc-700">
                    {bus.destination}
                  </p>


                </div>

              ))}


            </div>

          </div>








          {/* Search */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">


            <div className="flex items-center gap-2">

              <Search className="text-emerald-600" />

              <h2 className="font-sora text-xl font-bold">
                Search Bus
              </h2>

            </div>




            <div className="mt-6 space-y-4">


              {/* From */}

              <div className="rounded-2xl bg-zinc-50 p-4">

                <p className="text-xs text-zinc-500">
                  Starting point
                </p>


                <div className="mt-2 flex items-center gap-2 font-medium">

                  <Navigation className="h-4 w-4 text-emerald-600" />

                  Campus Bus Stop

                </div>


              </div>





              {/* Destination */}

              <div className="rounded-2xl bg-zinc-50 p-4">

                <p className="text-xs text-zinc-500">
                  Destination
                </p>


                <select className="mt-2 w-full bg-transparent font-medium outline-none">

                  <option>
                    Choose place
                  </option>


                  {destinations.map((place) => (

                    <option key={place}>
                      {place}
                    </option>

                  ))}


                </select>

              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">

                Find buses

                <Search className="h-4 w-4" />

              </button>

            </div>

          </div>

        </div>

        {/* Quick Destinations */}

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">


          <p className="mb-4 text-sm font-medium text-zinc-500">
            Quick destinations
          </p>



          <div className="flex flex-wrap gap-3">


            {destinations.map((place) => (

              <button
                key={place}
                className="rounded-full border border-zinc-200 px-5 py-2 text-sm transition hover:border-emerald-500 hover:text-emerald-600"
              >

                {place}

              </button>

            ))}
          </div>

        </div>

      </div>

    </section>
  );
}