<script>
    export let currentPage;
    export let totalPages;
    export let onPageChange;
</script>

{#if totalPages > 1}
    <nav aria-label="Contacts pagination" class="mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item {currentPage === 1 ? 'disabled' : ''}">
                <button 
                    class="page-link" 
                    on:click={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
            </li>
            
            {#each Array(totalPages) as _, i}
                <li class="page-item {currentPage === i + 1 ? 'active' : ''}">
                    <button 
                        class="page-link" 
                        on:click={() => onPageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                </li>
            {/each}
            
            <li class="page-item {currentPage === totalPages ? 'disabled' : ''}">
                <button 
                    class="page-link" 
                    on:click={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </li>
        </ul>
    </nav>
{/if}