"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Check, AlertCircle,Facebook, Twitter, Linkedin, Instagram, InstagramIcon, GithubIcon, LinkedinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

const iconsMap = {
  'instagram' : <InstagramIcon className="text-purple-500 mt-1" size={24} />,
  'github' : <GithubIcon className="text-purple-500 mt-1" size={24} />,
  'linkedin' : <LinkedinIcon className="text-purple-500 mt-1" size={24} />,
  'youtube' : <LinkedinIcon className="text-purple-500 mt-1" size={24} />,
  'facebook' : <LinkedinIcon className="text-purple-500 mt-1" size={24} />,
  'stack-overflow' : <svg className="text-purple-500 mt-1" fill="currentColor" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 19.59375 2.84375 L 17.96875 3.96875 L 23.5625 12.1875 L 25.1875 11.0625 Z M 15.375 6.53125 L 14.0625 8.03125 L 21.5625 14.53125 L 22.875 13.03125 Z M 12.375 10.90625 L 11.46875 12.6875 L 20.3125 17.1875 L 21.21875 15.40625 Z M 10.65625 15.4375 L 10.21875 17.375 L 19.875 19.65625 L 20.3125 17.71875 Z M 6 18 L 6 29 L 24 29 L 24 18 L 22 18 L 22 27 L 8 27 L 8 18 Z M 10.09375 19.6875 L 9.96875 21.6875 L 19.875 22.25 L 20 20.25 Z M 10 23 L 10 25 L 19.9375 25 L 19.9375 23 Z"/></svg>,
  'upwork': <svg className="text-purple-500 mt-1" fill="currentColor" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.75 17.542c-1.469 0-2.849-0.62-4.099-1.635l0.302-1.432 0.010-0.057c0.276-1.521 1.13-4.078 3.786-4.078 1.99 0 3.604 1.615 3.604 3.604 0 1.984-1.615 3.599-3.604 3.599zM24.75 6.693c-3.385 0-6.016 2.198-7.083 5.818-1.625-2.443-2.865-5.38-3.583-7.854h-3.646v9.484c-0.005 1.875-1.521 3.391-3.396 3.396-1.875-0.005-3.391-1.526-3.396-3.396v-9.484h-3.646v9.484c0 3.885 3.161 7.068 7.042 7.068 3.885 0 7.042-3.182 7.042-7.068v-1.589c0.708 1.474 1.578 2.974 2.635 4.297l-2.234 10.495h3.729l1.62-7.615c1.417 0.906 3.047 1.479 4.917 1.479 4 0 7.25-3.271 7.25-7.266 0-4-3.25-7.25-7.25-7.25z"/>
</svg>
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [data, setData] = useState(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      setSubmitStatus({
        success: false,
        message: "All fields are required.",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address.",
      })
      return false
    }

    return true
  }

  
  const handleSubmit = async (e, isGmailButton) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    try {
      // In a real application, you would send the form data to your backend
      // mail to pankajmalankiya@gmail.com with given subject email and name

      const { name, email, subject, message } = formData;

  // Encode message to avoid issues with spaces & special characters
  const mailtoLink = `mailto:pankajmalankiya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}%0AEmail: ${email}%0A%0A${message}`
  )}`;

  // Gmail Compose URL
  const gmailComposeURL = `https://mail.google.com/mail/?view=cm&fs=1&to=pankajmalankiya@gmail.com&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`)}`;

  // Open Gmail in a new tab
  window.open(isGmailButton ? gmailComposeURL : mailtoLink, "_blank");

      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!data) return null

  return (
    <section
      id="contact"
      className="section-container bg-gradient-to-b from-background/90 via-background/95 to-background"
    >
      <h2 className="section-title">Get In Touch</h2>

      <div ref={ref} className="grid md:grid-cols-2 md:gap-6 xl:gap-12 mt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true,amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gradient">Contact Information</h3>
          <p className="text-muted-foreground mb-8">
            Feel free to reach out to me for any inquiries, project discussions, or just to say hello! I'm always open
            to new opportunities and collaborations.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-lg">
                <Mail className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  {data.personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-lg">
                <Phone className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <a
                  href={`tel:${data.personalInfo.phone}`}
                  className="text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  {data.personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-lg">
                <MapPin className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">{data.personalInfo.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="font-semibold mb-4">Connect with me</h4>
            <div className="flex gap-4">
              {data.personalInfo.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card p-3 rounded-full hover:bg-purple-600/20 hover:text-purple-400 transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                 {iconsMap[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card/50 rounded-xl p-8 border border-border backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gradient">Send Me a Message</h3>

          {submitStatus && (
            <Alert
              className={`mb-6 ${submitStatus.success ? "bg-green-500/10 border-green-500/50 text-green-500" : "bg-destructive/10 border-destructive/50 text-destructive"}`}
            >
              <div className="flex items-center gap-2">
                {submitStatus.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{submitStatus.message}</AlertDescription>
              </div>
            </Alert>
          )}

          <form onSubmit={e => handleSubmit(e,true)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                Your Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-background/50 border-border"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                Your Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-background/50 border-border"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-background/50 border-border"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="bg-background/50 border-border"
              ></Textarea>
            </div>

            <div>
            <Button
              disabled={isSubmitting}
              onClick={e => handleSubmit(e,false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 border-0"
            >
              {isSubmitting ? "Sending..." : "Send Email"}
              <Send size={18} />
            </Button>
            <div className="flex justify-center my-2">
            OR
            </div>
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              onClick={e => handleSubmit(e,true)}
              className="w-full hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 border-0"
            >
              {isSubmitting ? "Sending..." : <div className="flex justify-center gap-2 items-center">
                Compose with <Image alt="gmail" width={'90'} height={'18'} src={'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png'} />
              </div>}
            </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

