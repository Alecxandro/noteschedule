import Contact from "../models/Contact.js";

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const contact = await Contact.create({
            user: req.user.id,
            name,
            email,
            phone,
            address,
        })

        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateContact = async (req, res) => {
    try {
     let contact = await Contact.findById(req.params.id);
     if (!contact) return res.status(404).json({ message: 'Contact not found' });

     if (contact.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

     contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
     )

     res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        await contact.deleteOne();
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
