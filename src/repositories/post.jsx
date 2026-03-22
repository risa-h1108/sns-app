import { supabase } from "../lib/supabase";

export const postRepository = {
  async create(content, userId) {
    const { data, error } = await supabase
      .from("posts") //postsテーブルからget等を実施できるよう記載
      .insert([{ content, user_id: userId }]) //insertで作成(追加)されたデータが定義したdataに入る
      .select("*"); //全ての情報を取得

    if (error != null) throw new Error(error.message);
    return data[0];
  },

  async find() {
    const { data, error } = await supabase
      .from("posts_view")
      .select("*")
      .order("created_at", { ascending: false }); //投稿が作成された時間順

    if (error != null) throw new Error(error.message);

    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata.name,
      };
    });
  },
};
