import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Calendar,
  Users,
  Clock,
  Mail,
  User,
  Phone,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import bookingAnimation from "../../assets/animations/booking.json";
import { contactInfo } from "../../data/contactInfo";

const TIME_SLOTS = [
  { time: "09:00 AM", status: "Available" },
  { time: "10:00 AM", status: "Available" },
  { time: "11:00 AM", status: "Available" },
  { time: "12:00 PM", status: "Available" },
  { time: "01:00 PM", status: "Available" },
  { time: "02:00 PM", status: "Available" },
  { time: "03:00 PM", status: "Available" },
  { time: "04:00 PM", status: "Available" },
  { time: "05:00 PM", status: "Available" },
  { time: "06:00 PM", status: "Available" },
  { time: "07:00 PM", status: "Prime Dining (Available)" },
  { time: "08:00 PM", status: "Prime Dining (Available)" },
  { time: "09:00 PM", status: "Available" },
  { time: "10:00 PM", status: "Last Call (Available)" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const lottieData = bookingAnimation?.default || bookingAnimation;
  const calendarRef = useRef(null);

  // Custom Isolated Date State
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    setValue("date", selectedDate);
    setValue("time", "09:00 AM");
    setValue("guests", "2");
  }, [setValue, selectedDate]);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const todayStr = new Date().toISOString().split("T")[0];

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const onSubmit = async (data) => {
    const phoneNumber = contactInfo.phoneRaw;

    const formattedMessage = `*New Table Reservation - Foody Stall* 🍽️\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Date:* ${data.date || selectedDate}\n*Time:* ${data.time}\n*Guests:* ${data.guests}\n*Note:* ${data.message || "None"}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // 1. Send automated background email to contactInfo.email via FormSubmit
    try {
      fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Table Reservation from ${data.name} (${data.date || selectedDate} at ${data.time})`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date || selectedDate,
          time: data.time,
          guests: data.guests,
          note: data.message || "None",
        }),
      });
    } catch (err) {
      console.error("Email dispatch error:", err);
    }

    // 2. Synchronously open WhatsApp directly
    const win = window.open(whatsappURL, "_blank");
    if (!win || win.closed || typeof win.closed === "undefined") {
      window.location.href = whatsappURL;
    }

    toast.success(`Reservation sent to ${contactInfo.email} & WhatsApp!`, {
      duration: 5000,
      style: {
        background: "#020617",
        color: "#6366f1",
        border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: "12px",
      },
    });

    reset();
  };

  return (
    <section className="py-28 bg-[#020617] relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-2/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase">
              <Sparkles size={14} /> Instant Booking
            </div>

            <h2 className="text-5xl md:text-6xl text-white font-bold leading-tight">
              Book Your <span className="text-indigo-400">Table</span>
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Reserve your table easily with live time slot availability from 9:00 AM to 10:00 PM.
            </p>

            <div className="w-[250px] h-[250px]">
              {lottieData && typeof lottieData === "object" && (
                <Player
                  autoplay
                  loop
                  src={bookingAnimation}
                  style={{ height: "250px", width: "250px" }}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-3/5 w-full"
          >
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative">
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* 1. Name */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Name
                  </label>
                  <div className="relative mt-2">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900/90 text-white outline-none border border-white/10 focus:border-indigo-500 transition-all text-sm"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* 2. Email */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </label>
                  <div className="relative mt-2">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email", { required: "Email is required" })}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900/90 text-white outline-none border border-white/10 focus:border-indigo-500 transition-all text-sm"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* 3. Phone */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phone
                  </label>
                  <div className="relative mt-2">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone", { required: "Phone is required" })}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900/90 text-white outline-none border border-white/10 focus:border-indigo-500 transition-all text-sm"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* 4. CUSTOM ISOLATED DATE PICKER */}
                <div className="relative" ref={calendarRef}>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Reservation Date
                  </label>
                  <div className="relative mt-2">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 z-10" />
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900/90 text-white text-left border border-white/10 hover:border-indigo-500 transition-all text-sm font-medium flex justify-between items-center cursor-pointer"
                    >
                      <span>{selectedDate}</span>
                      <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Change</span>
                    </button>
                    <input type="hidden" {...register("date", { required: "Date is required" })} value={selectedDate} />
                  </div>

                  {/* Glassmorphic Isolated Month Calendar Popover */}
                  <AnimatePresence>
                    {showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 top-full mt-2 z-50 bg-slate-950 border border-white/15 rounded-2xl p-4 shadow-2xl w-80 backdrop-blur-2xl"
                      >
                        {/* Month Header */}
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <span className="text-white font-serif font-bold text-base">
                            {monthNames[month]} {year}
                          </span>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>

                        {/* Day Names Header */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                            <span key={d} className="text-[10px] font-bold text-slate-500 uppercase">
                              {d}
                            </span>
                          ))}
                        </div>

                        {/* Isolated Month Days Grid (No overlapping days from previous/next month) */}
                        <div className="grid grid-cols-7 gap-1">
                          {/* Blank cells for day-offset */}
                          {Array.from({ length: firstDayIndex }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-8 w-8" />
                          ))}

                          {/* Month Days Only (All months filled & active) */}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const dayNum = i + 1;
                            const monthStr = String(month + 1).padStart(2, "0");
                            const dayStr = String(dayNum).padStart(2, "0");
                            const dateString = `${year}-${monthStr}-${dayStr}`;
                            const isSelected = selectedDate === dateString;

                            return (
                              <button
                                key={dayNum}
                                type="button"
                                onClick={() => {
                                  setSelectedDate(dateString);
                                  setValue("date", dateString);
                                  setShowCalendar(false);
                                }}
                                className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-2 ring-indigo-400 font-extrabold"
                                    : "text-slate-200 bg-white/5 hover:bg-indigo-500/30 hover:text-white"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. VISIBLE TIME SLOTS DROPDOWN (9:00 AM TO 10:00 PM WITH AVAILABILITY) */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Time Slot (9:00 AM - 10:00 PM)
                  </label>
                  <div className="relative mt-2">
                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
                    <select
                      {...register("time", { required: "Time is required" })}
                      className="w-full pl-10 pr-8 py-3.5 rounded-xl bg-slate-900 text-white border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm font-medium cursor-pointer appearance-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option 
                          key={slot.time} 
                          value={slot.time}
                          className="bg-slate-900 text-white py-3 px-4 font-medium"
                        >
                          {slot.time} — {slot.status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6. GUESTS */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Guests</label>
                  <div className="relative mt-2">
                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
                    <select
                      {...register("guests")}
                      className="w-full pl-10 pr-8 py-3.5 rounded-xl bg-slate-900 text-white border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm font-medium cursor-pointer appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <option key={num} value={num} className="bg-slate-900 text-white py-2">
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Special Request / Message</label>
                  <textarea
                    rows="3"
                    {...register("message")}
                    className="w-full mt-2 p-4 rounded-xl bg-slate-900/90 text-white border border-white/10 outline-none focus:border-indigo-500 transition-all text-sm resize-none"
                    placeholder="Dietary requirements or special seating requests..."
                  />
                </div>

                {/* BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold uppercase tracking-wider text-xs text-white flex justify-center items-center gap-2 shadow-xl shadow-indigo-600/20 cursor-pointer transition-all"
                >
                  Confirm Table Reservation <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;