import { useEffect, useState } from "react"
import { Moon } from "lucide-react"

const Footer = () => {
  const [quote, setQuote] = useState("Omnes una manet nox")

  useEffect(() => {
    const savedQuote = localStorage.getItem("footerQuote")
    if (savedQuote) {
      setQuote(savedQuote)
    }

    const handleQuoteUpdate = () => {
      const newQuote = localStorage.getItem("footerQuote")
      if (newQuote) setQuote(newQuote)
    }

    window.addEventListener("quoteUpdated", handleQuoteUpdate)

    return () => {
      window.removeEventListener("quoteUpdated", handleQuoteUpdate)
    }
  }, [])

  return (
    <div className="dark bg-muted text-foreground px-4 py-3">
      <p className="text-center text-sm">
        <Moon
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={16}
          aria-hidden="true"
        />
        {quote}{' '}
        <span className="text-muted-foreground">·</span>
      </p>
    </div>
  )
}

export default Footer
