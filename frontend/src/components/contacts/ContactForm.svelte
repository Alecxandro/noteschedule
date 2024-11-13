<script>
// @ts-nocheck

    import api from '$lib/api';

    // @ts-ignore
    export let onContactAdded; // Callback function
    export let onError;

    let newContact = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    async function addContact() {
        try {
            const response = await api.post('/contacts', newContact);
            onContactAdded(response.data);
            newContact = { name: '', email: '', phone: '', address: '' };
        } catch (err) {
            onError(err.response?.data?.message || 'Failed to add contact');
        }
    }
</script>

<div class="card mb-4">
    <div class="card-body">
        <h2 class="card-title">Add New Contact</h2>
        <form on:submit|preventDefault={addContact}>
            <div class="row g-3">
                <div class="col-md-6">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Name" 
                        bind:value={newContact.name} 
                        required
                    />
                </div>
                <div class="col-md-6">
                    <input 
                        type="email" 
                        class="form-control" 
                        placeholder="Email" 
                        bind:value={newContact.email}
                    />
                </div>
                <div class="col-md-6">
                    <input 
                        type="tel" 
                        class="form-control" 
                        placeholder="Phone" 
                        bind:value={newContact.phone}
                    />
                </div>
                <div class="col-md-6">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Address" 
                        bind:value={newContact.address}
                    />
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        Add Contact
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>