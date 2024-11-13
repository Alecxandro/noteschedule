<script>
// @ts-nocheck

    import { auth } from '$lib/stores/authStore';
    import api from '$lib/api';
    import { goto } from '$app/navigation';

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';

    async function handleRegister() {
        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            return;
        }

        try {
            const response = await api.post('/auth/register', { name, email, password });
            auth.set({
                user: response.data,
                token: response.data.token,
                isAuthenticated: true
            });
            goto('/dashboard');
        } catch (err) {
            error = err.response?.data?.message || 'Registration failed';
        }
    }
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="card-title text-center mb-4">Create Account</h1>
                    
                    {#if error}
                        <div class="alert alert-danger">{error}</div>
                    {/if}

                    <form on:submit|preventDefault={handleRegister}>
                        <div class="mb-3">
                            <label for="name" class="form-label">Username</label>
                            <input 
                                
                                class="form-control" 
                                id="name" 
                                bind:value={name} 
                                required
                            />
                        </div>
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

                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="confirmPassword" 
                                bind:value={confirmPassword} 
                                required
                            />
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            Register
                        </button>

                        <div class="text-center mt-3">
                            <a href="/" class="text-decoration-none">Already have an account? Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>