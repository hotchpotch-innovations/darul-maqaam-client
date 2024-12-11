import { Stack, Typography } from "@mui/material";

const ContactForm = () => {
  return (
    <form className="text-black w-full ">
      <Typography variant="h5" className="text-center pb-4  font-semibold">
        Contact Form{" "}
      </Typography>
      <Stack direction={"column"} gap={2}>
        <Stack
          sx={{
            flexDirection: {
              xs: "column", // Mobile devices
              sm: "row", // Tablet devices and larger
            },
            gap: {
              xs: 1, // Gap of 1 for mobile devices
              sm: 4, // Gap of 4 for tablet devices and larger
            },
          }}
        >
          <label htmlFor="name" className="w-1/3 lg:text-end">
            <span className="text-red-500 me-2">*</span>Your Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: {
              xs: "column", // Mobile devices
              sm: "row", // Tablet devices and larger
            },
            gap: {
              xs: 1, // Gap of 1 for mobile devices
              sm: 4, // Gap of 4 for tablet devices and larger
            },
          }}
        >
          <label htmlFor="email" className="w-1/3  lg:text-end">
            <span className="text-red-500 me-2">*</span>Your Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: {
              xs: "column", // Mobile devices
              sm: "row", // Tablet devices and larger
            },
            gap: {
              xs: 1, // Gap of 1 for mobile devices
              sm: 4, // Gap of 4 for tablet devices and larger
            },
          }}
        >
          <label htmlFor="subject" className="w-1/3  lg:text-end">
            <span className="text-red-500 me-2">*</span>Subject:
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: {
              xs: "column", // Mobile devices
              sm: "row", // Tablet devices and larger
            },
            gap: {
              xs: 1, // Gap of 1 for mobile devices
              sm: 4, // Gap of 4 for tablet devices and larger
            },
          }}
        >
          <label htmlFor="message" className="w-1/3  lg:text-end">
            <span className="text-red-500 me-2">*</span>Message:
          </label>

          <textarea
            name="message"
            id="message"
            rows={20}
            placeholder="Message"
            className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
          />
        </Stack>
        <Stack direction={"row"} className="justify-end" gap={4}>
          <span></span>
          <input
            type="submit"
            value="Send Message"
            className="bg-[#00A44F] py-2 w-1/2 rounded-ss-xl rounded-ee-xl text-white"
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default ContactForm;
