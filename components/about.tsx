"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Palette, Globe, Lightbulb, Users, Brain } from "lucide-react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  const iconMap = {
    code: <Code className="text-purple-500 mt-1" size={24} />,
    palette: <Palette className="text-purple-500 mt-1" size={24} />,
    globe: <Globe className="text-purple-500 mt-1" size={24} />,
    lightbulb: <Lightbulb className="text-purple-500 mt-1" size={24} />,
    users: <Users className="text-purple-500 mt-1" size={24} />,
    brain: <Brain className="text-purple-500 mt-1" size={24} />,
  };

  return (
    <section
      id="about"
      className="section-container bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <h2 className="section-title">About Me</h2>
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center mt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true,amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden gradient-border origin-top">
            <Image
              src="/images/profile.jpeg"
              alt="Profile"
              width={400}
              height={400}
              className="object-cover w-full h-full object-top"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -top-6 -left-6 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl z-0"></div>
        </motion.div>

        <motion.div
          transition={{ duration: 0.8, delay: 0.2 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <h3 className="text-2xl font-bold mb-4 text-gradient">Who I Am</h3>

          {data.about.description.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground mb-6">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-6 mt-8">
            {data.about.qualities.map((quality, index) => (
              <motion.div
                key={index}
                transition={{ duration: 0.8, delay: 0.2 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true,amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative"
              >
                {iconMap[quality.icon]}
                <div>
                  <h4 className="font-semibold">{quality.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {quality.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

