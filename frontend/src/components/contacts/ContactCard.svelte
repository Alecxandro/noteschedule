<script>
    export let contact;
    export let onDelete;
</script>

<div class="col">
    <div class="card h-100">
        <div class="card-body">
            <a 
                href="/contacts/{contact._id}" 
                class="text-decoration-none"
            >
                <h3 class="card-title">{contact.name}</h3>
                {#if contact.email}
                    <p class="card-text">
                        <i class="bi bi-envelope"></i> {contact.email}
                    </p>
                {/if}
                {#if contact.phone}
                    <p class="card-text">
                        <i class="bi bi-telephone"></i> {contact.phone}
                    </p>
                {/if}
            </a>
            <button 
                class="btn btn-danger" 
                on:click={() => onDelete(contact._id)}
            >
                Delete
            </button>
        </div>
    </div>
</div>