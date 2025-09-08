<script lang="ts">
	import { parse } from 'svelte/compiler';

    export let data;
    console.log('Page data:', data);
</script>

<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Updated title for segment types -->
    <title>Segment Types - Time Management System</title>
    <style>
        .dragging {
            opacity: 0.5;
            transform: rotate(2deg);
        }
        .drag-over {
            background-color: #f0f9ff;
            border-color: #0ea5e9;
        }
    </style>
</svelte:head>

<div class="bg-gray-50 min-h-screen">
    <div id="dataIn" data-data={JSON.stringify(data)}></div>
    <form method="POST" action="?/save" class="container mx-auto px-4 py-8 max-w-4xl">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <!-- Updated header text for segment types -->
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Segment Types</h1>
                    <p class="text-gray-600">Manage your segment type names by dragging to reorder</p>
                </div>
                <a href="/" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    ← Back to Dashboard
                </a>
            </div>
        </div>

        <!-- Updated container for segment types -->
        <div id="segmentTypesContainer" class="min-h-96 bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 mb-6 relative">
            <div class="text-center text-gray-400 mb-4" id="emptyState">
                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <p>Add your first segment type below to get started</p>
            </div>
            
        </div>

        <!-- Control Buttons -->
        <div class="flex gap-4 justify-center">
            <!-- Updated button text for segment types -->
            <button id="addSegmentTypeBtn" type="button" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Segment Type
            </button>
            <button type="submit" name="action" value="add" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save Segment
            </button>
        </div>
    </form>

    <script>
        let segmentTypeCounter = 0;
        let draggedElement = null;

        let data = JSON.parse(document.getElementById("dataIn").dataset.data)

        // Add initial segment type on page load
        document.addEventListener('DOMContentLoaded', function() {
            // addSegmentType()
            if(data.segments.length < 1) return addSegmentType()
            for (const s of data.segments){
                console.log(s)
                addSegmentType(s)
            }
        });

        document.getElementById('addSegmentTypeBtn').addEventListener('click', () => addSegmentType());

        function addSegmentType(text = '') {
            segmentTypeCounter++;
            const container = document.getElementById('segmentTypesContainer');
            const emptyState = document.getElementById('emptyState');
            
            // Hide empty state
            emptyState.style.display = 'none';

            const segmentTypeElement = document.createElement('div');
            segmentTypeElement.className = 'segment-type-item bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 cursor-move shadow-sm hover:shadow-md transition-shadow relative';
            segmentTypeElement.draggable = true;
            segmentTypeElement.id = `segment-type-${segmentTypeCounter}`;

            segmentTypeElement.innerHTML = `
                <div class="flex items-center gap-3">
                    <!-- Drag Handle -->
                    <div class="drag-handle text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                        </svg>
                    </div>
                    
                    <!-- Small Text Input -->
                    <input 
                        type="text"
                        name="segments[]"
                        class="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1 text-sm" 
                        placeholder="Enter segment type name..."
                        value="${text}"
                        onclick="event.stopPropagation()"
                    />
                    
                    <!-- Delete Button -->
                    <button class="delete-btn text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors" onclick="deleteSegmentType('${segmentTypeElement.id}')">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            `;

            // Add drag event listeners
            segmentTypeElement.addEventListener('dragstart', handleDragStart);
            segmentTypeElement.addEventListener('dragend', handleDragEnd);

            container.appendChild(segmentTypeElement);

            const textInput = segmentTypeElement.querySelector('input');
            textInput.focus();
        }

        function deleteSegmentType(segmentTypeId) {
            const segmentTypeElement = document.getElementById(segmentTypeId);
            if (segmentTypeElement) {
                segmentTypeElement.remove();
                
                // Show empty state if no segment types left
                const container = document.getElementById('segmentTypesContainer');
                const remainingTypes = container.querySelectorAll('.segment-type-item');
                if (remainingTypes.length === 0) {
                    document.getElementById('emptyState').style.display = 'block';
                }
            }
        }

        function handleDragStart(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.outerHTML);
        }

        function handleDragEnd(e) {
            this.classList.remove('dragging');
            draggedElement = null;
        }

        const segmentTypesContainer = document.getElementById('segmentTypesContainer');

        segmentTypesContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const afterElement = getDragAfterElement(segmentTypesContainer, e.clientY);
            if (afterElement == null) {
                segmentTypesContainer.appendChild(draggedElement);
            } else {
                segmentTypesContainer.insertBefore(draggedElement, afterElement);
            }
        });

        segmentTypesContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });

        segmentTypesContainer.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        segmentTypesContainer.addEventListener('dragleave', function(e) {
            if (!this.contains(e.relatedTarget)) {
                this.classList.remove('drag-over');
            }
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.segment-type-item:not(.dragging)')];
            
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

    </script>
</div>