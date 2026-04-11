export default function AdminProfile() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <p className="text-gray-400 mb-4">Profile form goes here. In a complete implementation, this would fetch from Supabase and allow saving changes.</p>
        {/* Form fields for name, wechat, email, bio, skills would be implemented here */}
        <button className="bg-white text-black font-semibold rounded-lg px-6 py-2 hover:bg-gray-200 transition-colors mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}
