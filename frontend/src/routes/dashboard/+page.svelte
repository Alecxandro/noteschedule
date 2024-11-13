<script>
    import { auth } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$auth.isAuthenticated) {
            goto('/auth/login');
        }
    });
</script>


{#if $auth.isAuthenticated}
<nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
        <div class="navbar-nav me-auto">
            <a class="nav-link" href="/dashboard">Dashboard</a>
            <a class="nav-link" href="/contacts">Contacts</a>
            <a class="nav-link" href="/notes">Notes</a>
        </div>
        <button 
            class="btn btn-danger" 
            on:click={() => {
                auth.set({ user: null, token: null, isAuthenticated: false });
                goto('/');
            }}
        >
            Logout
        </button>
    </div>
</nav>

<main class="container my-4">
    <slot />
</main>
{/if}

