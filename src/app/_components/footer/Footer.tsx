import { Mail, MapPin, Phone, ShoppingCart } from "lucide-react"
import Link from "next/link"

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/categories/electronics" },
  { label: "Men's Fashion", href: "/categories/men-fashion" },
  { label: "Women's Fashion", href: "/categories/women-fashion" },
]

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "Order History", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
]

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Help Center", href: "/help" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Track Order", href: "/track-order" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
]

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#101828] text-white">
      <div className="w-[90%] mx-auto py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-1 space-y-5">
          <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2">
            <ShoppingCart className="text-[#16A34A]" size={22} />
           <Link href={"/"}><span className="font-bold text-lg text-[#101828]">FreshCart</span></Link> 
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you
            the best brands at competitive prices with a seamless shopping experience.
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-green-500" />
              +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-green-500" />
              support@freshcart.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-green-500" />
              123 Commerce Street, New York, NY 10001
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <FooterColumn title="Shop" links={shopLinks} />
        </div>
        <div className="md:col-span-1">
          <FooterColumn title="Account" links={accountLinks} />
        </div>
        <div className="md:col-span-1">
          <FooterColumn title="Support" links={supportLinks} />
        </div>
        <div className="md:col-span-1">
          <FooterColumn title="Legal" links={legalLinks} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="w-[90%] mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray-300 text-sm">
            <span className="px-2 py-1 rounded bg-white/10">Visa</span>
            <span className="px-2 py-1 rounded bg-white/10">Mastercard</span>
            <span className="px-2 py-1 rounded bg-white/10">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}