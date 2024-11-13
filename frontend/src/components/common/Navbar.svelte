<script>
    import { page } from '$app/stores';
    import { auth } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand" href="/dashboard">Contact Manager</a>
        <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a 
                        class="nav-link {$page.url.pathname === '/dashboard' ? 'active' : ''}" 
                        href="/dashboard"
                    >
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a 
                        class="nav-link {$page.url.pathname === '/contacts' ? 'active' : ''}" 
                        href="/contacts"
                    >
                        Contacts
                    </a>
                </li>
                <!-- Add more navigation items as needed -->
                <li class="nav-item">
                    <a 
                        class="nav-link {$page.url.pathname === '/notes' ? 'active' : ''}" 
                        href="/notes"
                    >
                        Notes
                    </a>
                </li>
                <button 
                class="btn btn-danger" 
                on:click={() => {
                    auth.set({ user: null, token: null, isAuthenticated: false });
                    goto('/');
                }}
            >
                Logout
            </button>
            </ul>
        </div>
    </div>
</nav>