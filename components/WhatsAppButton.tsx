import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "7892736965"; // Replace with your number
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-[1000] overflow-hidden group"
      aria-label="Chat on WhatsApp"
    >
      {/* Outer container with gradient border */}
      <div className="relative p-[1px] rounded-full overflow-hidden">
        {/* Animated gradient border */}
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        
        {/* Button content */}
        <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-black-100 backdrop-blur-3xl hover:bg-black-200 transition-all duration-300">
          <FaWhatsapp className="text-[#CBACF9] text-2xl group-hover:scale-110 transition-transform duration-300" />
          <span className="text-white font-medium text-sm hidden md:block group-hover:text-purple transition-colors duration-300">
            Let&apos;s talk
          </span>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
               style={{
                 background: "radial-gradient(circle at center, #CBACF9 0%, transparent 70%)"
               }} 
          />
        </div>
      </div>
    </button>
  );
};

export default WhatsAppButton;