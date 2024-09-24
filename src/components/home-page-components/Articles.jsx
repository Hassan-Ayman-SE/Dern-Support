import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seperator from "./Seperator";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwUiFdeW_G0TWVssDkBfrf_su3O8WVhwqzg&s";
  const image2 = "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2023_03_MicrosoftTeams-image-217.jpg";
  const image3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAL6ISKa-017RUGswx3DzSkhgxiP-HsG9wAA&s";
  const image4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCWYHWSvhI9hOMjAmtWequVToLCdGYbSyWg&s";
  const image5 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dk4SlgrtQXZBOZ-i4-ZV-di70eWa3i6wEg&s";
  const image6 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32nH9xA714gkUisExQNTRRYxJXjETkrlzIA&s";

  // Dummy data for fallback
  const dummyArticles = [
    {
      _id: "1",
      img: image1,
      title: "Top 5 Tips for Computer Maintenance",
      excerpt:
        "Regular maintenance can prevent many common computer issues. Learn how to keep your PC in top shape with these easy-to-follow tips.",
    },
    {
      _id: "2",
      img: image2,
      title: "How to Fix Common Software Issues",
      excerpt:
        "From crashes to slow performance, discover solutions to common software problems that you can resolve on your own.",
    },
    {
      _id: "3",
      img: image3,
      title: "Essential Tools for DIY Computer Repairs",
      excerpt:
        "Equip yourself with the right tools for computer repairs. This guide covers the must-have tools for every tech enthusiast.",
    },
    {
      _id: "4",
      img: image4,
      title: "Preventing Data Loss: Best Practices",
      excerpt:
        "Data loss can be catastrophic. Learn how to protect your valuable data and avoid losing important files.",
    },
    {
      _id: "5",
      img: image5,
      title: "Understanding Hardware Upgrades",
      excerpt:
        "Upgrading your computer's hardware can boost performance. Explore the different components you can upgrade and their benefits.",
    },
    {
      _id: "6",
      img: image6,
      title: "Troubleshooting Network Connectivity Issues",
      excerpt:
        "Having trouble with your network? This guide will help you diagnose and fix common connectivity issues.",
    },
  ];

  const latestArticles = articles.slice(-3).reverse();

  return (
    <div className="container mx-auto px-4 my-28">
      <Seperator
        heading="Latest Articles"
        text="Stay updated with the latest tips and guides on computer repairs and maintenance."
      />
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full">
        {dummyArticles.map((article) => (
          <div
            key={article._id}
            className="article-card max-w-sm rounded-lg overflow-hidden shadow-lg bg-customWhite transform transition duration-500 hover:shadow-2xl w-full mb-4"
          >
            <img
              className="w-full h-64 object-cover transform transition duration-500 hover:opacity-75 hover:cursor-pointer"
              src={article.img}
              alt={article.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-customTeal">
                {article.title}
              </div>
              <p className="text-customDarkGray text-base mb-4 line-clamp-4">
                {article.excerpt}
              </p>
              <div className="flex justify-center">
                <Link
                  to={`/articles/${article._id}`}
                  className="border border-customTeal text-customTeal px-4 py-2 rounded hover:bg-customTeal hover:text-white transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
