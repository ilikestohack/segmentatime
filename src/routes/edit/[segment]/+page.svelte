<script lang="ts">
	import { enhance } from '$app/forms';

    export let data;
    let segment = data.segment;

    const segmentName: string = segment.id === -1 ? "(New)" : segment.id.toString()
    console.log('Page data:', data);
</script>

<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Segment - Time Management System</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#059669',
                        secondary: '#10b981',
                        accent: '#f59e0b',
                        neutral: '#6b7280',
                    }
                }
            }
        }
    </script> -->
</svelte:head>

<div class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <header class="mb-8">
            <div class="flex items-center gap-4 mb-4">
                <a href="../../" class="text-neutral hover:text-gray-900 transition-colors" aria-label="Back to home">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </a>
                <h1 class="text-3xl font-bold text-gray-900">Edit Segment {segmentName}</h1>
            </div>
            <p class="text-neutral">Modify or create a new time segment</p>
        </header>

        <!-- Edit Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
            <form method="POST" action="?/save" class="space-y-6">
                <!-- Segment Type -->
                <div>
                    <label for="segment-type" class="block text-sm font-medium text-gray-900 mb-2">Segment Type</label>
                    <select id="segment-type" name="segmentType" value={segment.type} class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        {#each data.segmentTypes as option}
                            <option value="{option}">{option}</option>
                        {/each}
                    </select>
                </div>

                <!-- Task Name -->
                <div>
                    <label for="task-name" class="block text-sm font-medium text-gray-900 mb-2">Task Name</label>
                    <input 
                        id="task-name"
                        type="text"
                        name="taskName"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                        placeholder="e.g., Project Planning & Strategy"
                        value={segment.title}
                    >
                </div>

                <!-- Time Settings -->
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label for="time-alloc" class="block text-sm font-medium text-gray-900 mb-2">Time Allocated</label>
                        <input 
                            id="time-alloc"
                            type="number" 
                            name="timeAlloc"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={segment.timeAllocation}
                        >
                    </div>
                    <div>
                        <label for="time-ext" class="block text-sm font-medium text-gray-900 mb-2">Time Extension</label>
                        <input 
                            id="time-ext"
                            type="number" 
                            name="timeExt"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={segment.timeExtensionDifference}
                        >
                    </div>
                </div>

                <!-- Limits -->
                <fieldset class="mb-0">
                    <legend class="block text-sm font-medium text-gray-900 mb-3">Limits & Constraints</legend>
                    <div class="space-y-3">
                        {#each Object.keys(data.limits) as optionKey}
                            <div class="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id={optionKey}
                                    name="selectedLimits"
                                    class="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    value={optionKey}
                                    checked={data.limits[optionKey]}
                                >
                                <label for={optionKey} class="text-sm text-gray-900">{optionKey}</label>
                            </div>
                        {/each}
                    </div>
                    
                    <!-- Break Limit -->
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-900 mb-2" for="max-breaks">Maximum Breaks Allowed</label>
                        <input 
                            id="max-breaks"
                            type="number" 
                            name="maxBreaks"
                            min="0" 
                            max="10" 
                            class="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={segment.maxBreaks}
                        >
                    </div>
                </fieldset>

                <!-- Points Target -->
                <div>
                    <label for="points-slider" class="block text-sm font-medium text-gray-900 mb-3">Points Target</label>
                    <div class="flex items-center gap-4">
                        <input 
                            type="range" 
                            name="points"
                            min="1" 
                            max="6" 
                            value={segment.pointsAvailable}
                            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            id="points-slider"
                        >
                        <span class="text-sm font-medium text-gray-900 w-12" id="points-value">{segment.pointsAvailable}/6</span>
                    </div>
                    
                    <!-- Points Preview - There should be 6 text-red-500 text-gray-300 -->
                    <div class="mt-3">
                        <div class="grid grid-cols-6 gap-2 w-fit">
                            {#each Array.from({ length: 6 }) as _, index}
                                <svg 
                                    class="w-6 h-6 {index < segment.pointsAvailable ? 'text-red-500' : 'text-green-600'}" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <!-- Outer green rind -->
                                    <circle cx="12" cy="12" r="10" fill="green" />

                                    <!-- Inner red flesh (inherits Tailwind color via currentColor) -->
                                    <circle cx="12" cy="12" r="8" fill="currentColor" />

                                    <!-- Seeds -->
                                    <ellipse cx="12" cy="8" rx="0.6" ry="1" fill="black"/>
                                    <ellipse cx="9" cy="11" rx="0.6" ry="1" fill="black"/>
                                    <ellipse cx="15" cy="11" rx="0.6" ry="1" fill="black"/>
                                    <ellipse cx="10.5" cy="15" rx="0.6" ry="1" fill="black"/>
                                    <ellipse cx="13.5" cy="15" rx="0.6" ry="1" fill="black"/>
                                </svg>
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                <div>
                    <label for="details-notes" class="block text-sm font-medium text-gray-900 mb-2">Details/Notes</label>
                    <textarea 
                        id="details-notes"
                        name="notes"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none" 
                        rows="4" 
                        placeholder="Add detailed notes about this segment...">{segment.notes}</textarea>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button type="submit" name="action" value="add" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Save Segment
                    </button>
                    <button type="submit" name="action" value="addAnother" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Save & Add Another
                    </button>
                    <a href="/" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Update points slider display
        const slider = document.getElementById('points-slider');
        const pointsValue = document.getElementById('points-value');
        const watermelons = document.querySelectorAll('.grid svg');
        
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            pointsValue.textContent = `${value}/6`;
            
            // Update watermelon colors
            watermelons.forEach((watermelon, index) => {
                if (index < value) {
                    watermelon.classList.remove('text-green-600');
                    watermelon.classList.add('text-red-500');
                } else {
                    watermelon.classList.remove('text-red-500');
                    watermelon.classList.add('text-green-600');
                }
            });
        });
    </script>
</div>
