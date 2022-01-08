<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class PostController extends Controller
{
    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $this->post->orderBy('created_at', 'DESC')->get();
        if($request->has('search')) {
            $search = $request->input('search');
            $data = $this->post->where('title', 'like', '%'.$search.'%')
                        ->orWhere('category', 'like', '%'.$search.'%')
                        ->orWhere('description', 'like', '%'.$search.'%')
                        ->get();
        }
        return response()->json([
            "status" => 200,
            "message" => "ok",
            "data" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $title = $request->title;
        $category = $request->category;
        $description = $request->description;

        $insert = $this->post->create([
            'title' => $title,
            'category' => $category,
            'description' => $description,
            'id_user' => $user_id,
            'publish_at' => Carbon::now()->format('Y-m-d')
        ]);

        if($insert) {
            return response()->json([
                "status" => 200,
                "message" => "Post are created",
                "data" => ""
            ]);
        }else {
            return response()->json([
                "status" => 500,
                "message" => "Post are not created",
                "data" => ""
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = $this->post->where('id', $id)->first();
        if($data) {
            return response()->json([
                "status" => 200,
                "message" => "",
                "data" => $data
            ]);
        }else {
            return response()->json([
                "status" => 404,
                "message" => "data not found",
                "data" => ""
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update = $this->post->where('id', $id)->update([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
        ]);

        if($update) {
            $data = $this->post->where('id', $id)->first();
            return response()->json([
                "status" => 200,
                "message" => "",
                "data" => $data
            ]);
        }else {
            return response()->json([
                "status" => 500,
                "message" => "Post are not updated",
                "data" => ""
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = $this->post->where('id', $id)->delete();

        if($delete) {
            return response()->json([
                "status" => 200,
                "message" => "Post are deleted",
                "data" => ""
            ]);
        }else {
            return response()->json([
                "status" => 500,
                "message" => "Post cannot delete",
                "data" => ""
            ]);
        }
    }
}
