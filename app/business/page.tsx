import BusinessHero from '@/components/BusinessHero'
import APIIntegration from '@/components/APIIntegration'
import PartnershipOptions from '@/components/PartnershipOptions'
import ContactForm from '@/components/ContactForm'

export default function BusinessPage() {
  return (
    <div className="min-h-screen">
      <BusinessHero />
      <APIIntegration />
      <PartnershipOptions />
      <ContactForm />
    </div>
  )
} 