import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDropContainer.css'; // Ensure this file exists

function DragAndDropContainer() {
    const [items, setItems] = useState([
        { id: 1, content: 'Name' },
        { id: 2, content: 'Email' },
    ]);

    const onDragEnd = (result) => {
        console.log('Drag result:', result); // Log the result of the drag operation
        if (!result.destination) {
            console.log('No destination'); // Log if no destination is found
            return;
        }

        const reorderedItems = Array.from(items);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        console.log('Reordered items:', reorderedItems); // Log reordered items
        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className="droppable"
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="draggable"
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DragAndDropContainer;
