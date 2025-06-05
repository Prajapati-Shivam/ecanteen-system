 import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className=" relative overflow-hidden">
        <Container maxWidth="lg" className="pt-24 pb-16">
          {/* Announcement */}
          

          {/* Title */}
          <Typography
            variant="h3"
            align="center"
            className="mt-8 font-semibold text-4xl text-gray-50 leading-snug"
          >
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-blue-600">
              E-Canteen
            </span>
          </Typography>

 

          {/* Buttons */}
          <Box className="mt-10 flex justify-center gap-4">
            <Button
              variant="contained"
              size="medium"
              className="bg-gradient-to-tr from-green-500 to-blue-600 text-white px-6 shadow-sm hover:shadow-md transition"
            >
              Start Ordering
            </Button>
            <Button
              variant="outlined"
              size="medium"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 transition"
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </div>

      {/* Landing Section */}
      <section className="py-20 ">
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            align="center"
            className="font-semibold text-2xl text-gray-50 p-4 mb-8"
          >
            Why Choose E-Canteen?
          </Typography>

           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Ordering",
                desc: "Skip queues by ordering directly from your mobile or desktop.",
              },
              {
                title: "Wallet Integration",
                desc: "Use campus wallet or UPI to make secure and instant payments.",
              },
              {
                title: "Live Menu",
                desc: "View real-time menus with ratings, item availability, and more.",
              },
            ].map((item, idx) => (
              <Box
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-sm transition"
              >
                <h5 className="font-medium text-lg text-gray-800 mb-2">{item.title}</h5>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </Box>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
