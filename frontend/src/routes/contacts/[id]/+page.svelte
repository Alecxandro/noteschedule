<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import api from '$lib/api';

    let contact = null;
    let loading = true;
    let error = null;

    async function loadContact() {
        try {
            const response = await api.get(`/contacts/${$page.params.id}`);
            contact = response.data;
        } catch (err) {
            error = err.response?.data?.message || 'Failed to load contact';
        } finally {
            loading = false;
        }
    }

    onMount(loadContact);
</script>

<div class="container">
    <div class="mb-4">
        <a href="/contacts" class="btn btn-secondary">← Back to Contacts</a>
    </div>

    {#if error}
        <div class="alert alert-danger">{error}</div>
    {/if}

    {#if loading}
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else if contact}
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">{contact.name}</h1>
                <div class="mt-4">
                    {#if contact.email}
                        <div class="mb-3">
                            <strong><i class="bi bi-envelope"></i> Email:</strong>
                            <p>{contact.email}</p>
                        </div>
                    {/if}
                    {#if contact.phone}
                        <div class="mb-3">
                            <strong><i class="bi bi-telephone"></i> Phone:</strong>
                            <p>{contact.phone}</p>
                        </div>
                    {/if}
                    {#if contact.address}
                        <div class="mb-3">
                            <strong><i class="bi bi-geo-alt"></i> Address:</strong>
                            <p>{contact.address}</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>