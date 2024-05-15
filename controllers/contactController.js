const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route Get /api/contacts
//@access privet
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
    res.send("successful");
});

//@desc Create contacts
//@route Get /api/contacts
//@access privet
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get contacts
//@route Get /api/contacts/:id
//@access privet
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


//@desc Update contact
//@route Get /api/contacts/:id
//@access privet
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContac = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    );
    res.status(200).json(updateContact);
});


//@desc Delete contact
//@route Get /api/contacts/:id
//@access privet
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = { getContacts,getContact, createContact,updateContact, deleteContact };

