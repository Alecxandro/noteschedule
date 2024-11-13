<script>
    export let onSearch;
    let searchTerm = '';

    function handleInput() {
        onSearch(searchTerm);
    }
</script>

<div class="mb-4">
    <div class="input-group">
        <span class="input-group-text">
            <i class="bi bi-search"></i>
        </span>
        <input
            type="text"
            class="form-control"
            placeholder="Search contacts by name..."
            bind:value={searchTerm}
            on:input={handleInput}
        />
    </div>
</div>