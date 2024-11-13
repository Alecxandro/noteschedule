<script>
    import { onMount } from 'svelte';
    import api from '$lib/api';
    import ContactForm from '../../components/contacts/ContactForm.svelte';
    import ContactCard from '../../components/contacts/ContactCard.svelte';
    import Pagination from '../../components/common/Pagination.svelte';

    let contacts = [];
    let loading = true;
    let error = null;

    // Pagination state
    let currentPage = 1;
    const contactsPerPage = 6;
    let totalPages = 0;
    let displayContacts = [];

    function updateDisplayContacts() {
        const startIndex = (currentPage - 1) * contactsPerPage;
        const endIndex = startIndex + contactsPerPage;
        displayContacts = contacts.slice(startIndex, endIndex);
        totalPages = Math.ceil(contacts.length / contactsPerPage);
    }

    async function loadContacts() { 
        try {
            loading = true;
            const response = await api.get('/contacts');
            contacts = response.data;
            updateDisplayContacts();
        } catch (err) {
            error = err.response?.data?.message || 'Failed to load contacts';
        } finally {
            loading = false;
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`/contacts/${id}`);
            contacts = contacts.filter(contact => contact._id !== id);
            updateDisplayContacts();
        } catch (err) {
            error = err.response?.data?.message || 'Failed to delete contact';
        }
    }

    function handleContactAdded(newContact) {
        contacts = [...contacts, newContact];
        updateDisplayContacts();
    }

    function handleError(message) {
        error = message;
    }

    function handlePageChange(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            updateDisplayContacts();
        }
    }

    onMount(loadContacts);

    $: if (contacts.length) {
        updateDisplayContacts();
    }
</script>

<div class="container">
    <h1 class="mb-4">Contacts</h1>

    {#if error}
        <div class="alert alert-danger">{error}</div>
    {/if}

    <ContactForm 
        onContactAdded={handleContactAdded}
        onError={handleError}
    />

    {#if loading}
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else}
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {#each displayContacts as contact}
                <ContactCard {contact} onDelete={handleDelete} />
            {/each}
        </div>

        <Pagination 
            {currentPage}
            {totalPages}
            onPageChange={handlePageChange}
        />
    {/if}
</div>