<script lang="ts">
    export let data;
    console.log('Page data:', data);
</script>

<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Management System</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
</svelte:head>


<div class="max-w-4xl mx-auto">
    <!-- Upcoming Segments -->
    <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Segments</h2>
        
        <!-- Segment 1 -->
         
        {#each data.segments as segment, index}
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">{index + 1}</span>
                    <div class="flex items-center gap-3">
                        <a href="./edit/{segment.id}" class="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </a>
                        <!-- <div class="text-sm text-neutral">10:30 AM - 11:00 AM</div> -->
                    </div>
                </div>
                
                <div class="mb-3">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{segment.type}</h3>
                    <h4 class="text-base text-neutral">{segment.title}</h4>
                </div>

                <div class="flex items-center gap-4 text-sm text-neutral">
                    <span>{segment.timeAllocation} minutes</span>
                    <div class="flex gap-1"> 
                        <div class="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            {segment.maxBreaks} Break Max
                        </div>
                        {#each segment.limits as limit}
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{limit}</span>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}

        <!-- Segment 2 -->
        <!-- <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Later</span>
                <div class="flex items-center gap-3">
                    <button class="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <div class="text-sm text-neutral">11:00 AM - 12:30 PM</div>
                </div>
            </div>
            
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Meetings</h3>
                <h4 class="text-base text-neutral">Team Standup & Client Call</h4>
            </div>

            <div class="flex items-center gap-4 text-sm text-neutral">
                <span>90 minutes</span>
                <div class="flex gap-1">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Collaborative</span>
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">External</span>
                </div>
            </div>
        </div> -->

        <!-- Segment 3 -->
        <!-- <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Afternoon</span>
                <div class="flex items-center gap-3">
                    <button class="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <div class="text-sm text-neutral">1:30 PM - 3:00 PM</div>
                </div>
            </div>
            
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Implementation</h3>
                <h4 class="text-base text-neutral">Code Review & Bug Fixes</h4>
            </div>

            <div class="flex items-center gap-4 text-sm text-neutral">
                <span>90 minutes</span>
                <div class="flex gap-1">
                    <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">No Interruptions</span>
                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Technical</span>
                </div>
            </div>
        </div> -->
    </div>
</div>