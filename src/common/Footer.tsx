import { Moon } from "lucide-react"

const Footer = () => {
  return (
   <div className="dark bg-muted text-foreground px-4 py-3">
      <p className="text-center text-sm">
        <Moon
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={16}
          aria-hidden="true"
        />
        Without observing death up close, one can't capture the full picture of what it means to live{' '}
        <span className="text-muted-foreground">·</span>
      </p>
    </div>
  )
}

export default Footer