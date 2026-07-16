import { useEffect, useMemo, useState } from "react";
import {
  Bus,
  Clock3,
  MapPin,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  getDepartures,
  getDestinations,
} from "../services/departure.service";

interface Departure {
  id: number;
  bus_name: string;
  destination: string;
  departure_time: string;
}

export default function Hero() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  const [loading, setLoading] = useState(true);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [departureData, destinationData] = await Promise.all([
          getDepartures(),
          getDestinations(),
        ]);

        setDepartures(departureData);
        setDestinations(destinationData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSearch(destination: string) {
    setLoading(true);

    try {
      const data = await getDepartures(destination);

      setDepartures(data);
      setSelectedDestination(destination);
    } finally {
      setLoading(false);
    }
  }

  const nextBus = departures[0];

  const countdown = useMemo(() => {
    if (!nextBus) return "--:--:--";

    const [hours, minutes] = nextBus.departure_time
      .slice(0, 5)
      .split(":")
      .map(Number);

    const departure = new Date();

    departure.setHours(hours);
    departure.setMinutes(minutes);
    departure.setSeconds(0);

    let diff = departure.getTime() - now.getTime();

    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [nextBus, now]);
  const greeting =
    now.getHours() < 12
      ? "Good Morning ☀️"
      : now.getHours() < 17
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";
  const [userLocation, setUserLocation] = useState<string>("Detecting location...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setUserLocation("Near your bus stop");
      },
      () => {
        setUserLocation("Location permission denied");
      }
    );
  }, []);
  return (
    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#f8faf9]
      font-inter
    "
    >

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
          absolute
          -top-40
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-emerald-300/20
          blur-[120px]
        "
        />

        <div
          className="
          absolute
          inset-0
          opacity-20
          [background-image:radial-gradient(#d4d4d8_1px,transparent_1px)]
          [background-size:24px_24px]
        "
        />

      </div>



      <div
        className="
        relative
        mx-auto
        flex
        min-h-screen
        max-w-6xl
        items-center
        px-5
        py-16
        sm:px-8
      "
      >


        <div
          className="
          grid
          w-full
          gap-12
          lg:grid-cols-2
          lg:items-center
        "
        >



          {/* LEFT */}

          <div className="space-y-7">


            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-2
              text-xs
              font-semibold
              text-emerald-700
            "
            >

              <span
                className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-500
              "
              />

              Real-time Bus Updates

            </div>



            <h1
              className="
              font-sora
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-[-0.06em]
              text-zinc-950
              sm:text-6xl
              lg:text-7xl
            "
            >

              Your bus.
              <br />

              Before you wait.

            </h1>



            <p
              className="
              max-w-md
              text-base
              leading-relaxed
              text-zinc-500
              sm:text-lg
            "
            >

              Get upcoming bus timings from your stop
              and plan your journey without guessing.

            </p>





            {/* Search */}

            <div
              className="
              flex
              max-w-md
              items-center
              rounded-2xl
              border
              border-zinc-200
              bg-white
              p-2
              shadow-sm
            "
            >

              <Search
                className="
                ml-3
                h-5
                w-5
                text-emerald-600
              "
              />


              <select
                value={selectedDestination}
                onChange={(e) => handleSearch(e.target.value)}
                className="
                flex-1
                bg-transparent
                px-4
                py-3
                text-sm
                outline-none
              "
              >

                <option value="">
                  Search destination
                </option>

                {
                  destinations.map(item => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))
                }

              </select>


              <ChevronDown
                className="
                mr-3
                h-4
                w-4
                text-zinc-400
              "
              />

            </div>


          </div>









          {/* LIVE DASHBOARD */}


          <div
            className="
            rounded-[36px]
            border
            border-zinc-200
            bg-white
            p-6
            shadow-[0_30px_80px_-30px_rgba(0,0,0,.2)]
            sm:p-8
          "
          >


            {/* Location */}

            <div
              className="
              flex
              items-center
              justify-between
            "
            >

              <div>

                <p className="text-xs text-zinc-400">
                  Current location
                </p>


                <div
                  className="
                  mt-1
                  flex
                  items-center
                  gap-2
                  font-medium
                  text-zinc-800
                "
                >

                  <MapPin
                    className="
                    h-4
                    w-4
                    text-emerald-600
                  "
                  />

                  {userLocation}

                </div>

              </div>



              <div
                className="
                rounded-full
                bg-zinc-100
                px-3
                py-2
                text-xs
                text-zinc-500
              "
              >

                {now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>


            </div>
            {
              loading ? (

                <div
                  className="
                  mt-8
                  h-72
                  animate-pulse
                  rounded-3xl
                  bg-zinc-100
                "
                />

              ) : nextBus ? (

                <>

                  {/* NEXT BUS */}
                  <div
                    className="
                    mt-8
                    rounded-3xl
                    bg-zinc-950
                    p-6
                    text-white
                  "
                  >
                    <div
                      className="
                      flex
                      justify-between
                    "
                    >
                      <p
                        className="
                        text-xs
                        text-white/50
                      "
                      >
                        NEXT BUS
                      </p>
                      <span
                        className="
                        rounded-full
                        bg-emerald-500/20
                        px-3
                        py-1
                        text-xs
                        text-emerald-300
                      "
                      >
                        LIVE
                      </span>
                    </div>
                    <h2
                      className="
                      mt-6
                      font-sora
                      text-4xl
                      font-semibold
                    "
                    >
                      {nextBus.destination}
                    </h2>
                    <div
                      className="
                      mt-6
                      flex
                      items-end
                      justify-between
                    "
                    >
                      <div>
                        <p className="text-xs text-white/50">
                          Leaves in
                        </p>
                        <p
                          className="
                          font-sora
                          text-5xl
                          font-semibold
                        "
                        >
                          {countdown}
                        </p>
                      </div>
                      <Clock3
                        className="
                        h-8
                        w-8
                        text-emerald-400
                      "
                      />
                    </div>
                  </div>
                  <div
                    className="
                    mt-6
                    space-y-4
                  "
                  >

                    <div className="flex gap-3">
                      <Bus className="text-emerald-600" />
                      <div>
                        <p className="text-xs text-zinc-400">
                          Bus
                        </p>
                        <p className="font-medium">
                          {nextBus.bus_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock3 className="text-emerald-600" />
                      <div>
                        <p className="text-xs text-zinc-400">
                          Departure
                        </p>
                        <p className="font-medium">
                          {nextBus.departure_time.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (

                <div className="mt-8 text-center">
                  No buses available
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}