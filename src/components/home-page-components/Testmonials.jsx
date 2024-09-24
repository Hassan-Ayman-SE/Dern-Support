import "../../CSS/Testmonials.css";
import { useState } from "react";
import Seperator from "./Seperator";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const testimonials = [
    {
      name: "Liam Johnson",
      quote:
        "The support provided by TechCare is exceptional. Their quick response and effective solutions have greatly improved our productivity.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRlY2h8ZW58MHx8fDE2NjQ3NzU5&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Emma Williams",
      quote:
        "TechCare has been a game-changer for our IT needs. Their professional team handles everything with expertise and care.",
      image:
        "https://media.istockphoto.com/id/1348209421/photo/smiling-business-woman-working-with-laptop-while-looking-at-camera-in-modern-startup-office.jpg?s=612x612&w=0&k=20&c=-YOjhdxdWLjflmpzPyUjtYL80zhbJYqSANk6hhDPXL0="
    },
    {
      name: "Sophia Brown",
      quote:
        "Our experience with TechCare has been nothing short of excellent. Their support team is knowledgeable and always ready to help.",
      image:
        "https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=",
    },
  ];

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
    setClickedImageIndex(index);
  };

  return (
    <>
      <Seperator
        heading="Testimonials"
        text="Read what our clients have to say about our services and how we have made a difference for them."
      />
      <section
        className="mb-20 testimonials text-center relative py-[100px] bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url(../img/testbcg.jpg)" }}
      >
        <div className="absolute inset-0 bg-customLight opacity-70"></div>
        <div className="container mx-auto relative">
          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <div id="quote-carousel" className="relative">
                {/* Bottom Carousel Indicators */}
                <ol className="flex justify-center items-center mb-4 space-x-2">
                  {testimonials.map((testimonial, index) => (
                    <li
                      key={index}
                      className={`w-[80px] h-[80px] cursor-pointer border-2 border-customGray rounded-full overflow-hidden transition-opacity ease-in ${activeIndex === index
                        ? "opacity-100 scale-105 border-customTeal"
                        : "opacity-50"
                        }`}
                      onClick={() => handleIndicatorClick(index)}
                    >
                      <img
                        className={`object-cover w-full h-full transition-transform duration-300 ${activeIndex === index ? "scale-110" : ""
                          }`}
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </li>
                  ))}
                </ol>
                {/* Carousel Slides / Quotes */}
                <div className="text-center space-y-8">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`${activeIndex === index ? "block" : "hidden"
                        }`}
                    >
                      <div className="max-w-3xl mx-auto relative">
                        <h4 className="bg-customTeal text-sm p-2 rounded-md mx-auto absolute inset-x-0 top-[-20px] w-auto font-bold">
                          {testimonial.name}
                        </h4>
                        <blockquote className="border-2 border-customWhite p-12 mt-20 bg-customWhite text-customDarkGray rounded-md">
                          <p className="text-customDarkGray">{testimonial.quote}</p>
                        </blockquote>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
