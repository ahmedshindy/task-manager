<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TasksController extends Controller
{
    // Display a listing of the tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    // Store a newly created task in storage
    public function store(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // Display the specified task
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Update the specified task in storage
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|string|in:pending,completed,in-progress',
        ]);

        $task = Task::findOrFail($id);
        $task->update($validatedData);

        return response()->json($task);
    }

    // Remove the specified task from storage
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(null, 204);
    }
}
