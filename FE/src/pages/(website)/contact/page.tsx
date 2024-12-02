import React from 'react'
import ContactUs from './_componnents/ContactUs'
import OurContacts from './_componnents/OurContacts'
import Questions from './_componnents/Questions'

const ContactPage = () => {
    return (
        <div className="w-full">
            <ContactUs />
            <OurContacts />
            <Questions />
        </div>
    )
}

export default ContactPage