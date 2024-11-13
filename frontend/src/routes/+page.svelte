<script>
    import { auth } from '$lib/stores/authStore';
    import api from '$lib/api';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = '';

    async function handleLogin() {
        try {
            const response = await api.post('/auth/login', { email, password });
            auth.set({
                user: response.data,
                token: response.data.token,
                isAuthenticated: true
            });
            goto('/dashboard');
        } catch (err) {
            // @ts-ignore
            error = err.response?.data?.message || 'Login failed';
        }
    }
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="card-title text-center mb-4">NOTE APP</h1>
                    
                    {#if error}
                        <div class="alert alert-danger">{error}</div>
                    {/if}

                    <form on:submit|preventDefault={handleLogin}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                bind:value={email} 
                                required
                            />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                bind:value={password} 
                                required
                            />
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            Login
                        </button>
                        <br>
                        <br>
                        <a class="btn btn-success w-100" href="/register">
                            Register</a>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>