import React, { useState } from "react";
import classes from '../css/Contact.module.css';


export const Contact = () => {
  //ステート定義
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    message:"",
  });
  const [errors,setErrors] = useState({});
  const [isSubmitting,setIsSubmitting] = useState(false);

  //フォームの入力値の変更処理(handleChange)
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, [id]:value
    }));
  };
  //正しい形式で入力しているかチェック(バリデーション)
  const validate = () => {
    const errorMessages = {};
    //エラーメッセージを一時的に格納する役割

    //名前：入力必須＆30文字以内
    if (!formData.name) {
      errorMessages.name = "お名前は入力必須です。";//名前が空欄の場合に返すエラーメッセージ
    } else if (formData.name.length > 30) {
      errorMessages.name = "お名前は30文字以内で入力してください。";//名前が20文字以上の場合に返すエラーメッセージ
    }
    //メールアドレスのバリデーションに、標準の正規表現を定義
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!formData.email) {
      errorMessages.email = "メールアドレスは入力必須です。";
    } else if (!emailRegex.test(formData.email)) {
      //testメソッドを使い正規表現(emailRegex)の条件に一致しない場合はエラーメッセージを表示する
      errorMessages.email = "メールアドレスの形式が正しくありません。";
    }

    //本文：入力必須 & 500字以内
    if (!formData.message) {
      errorMessages.message = "本文は入力必須です。";
    } else if (formData.message.length > 500) {
      errorMessages.message = "本文は500字以内で入力してください。";
    }
    //入力チェック(バリデーション)を検証した後、エラーがあればerrorMessageオブジェクトを返す。
    setErrors(errorMessages);
    //バリデーションの結果を返す
    return Object.keys(errorMessages).length === 0;
  };

  //フォームの送信時に行う処理(handleSubmit)
  const handleSubmit = async (event) => {
    event.preventDefault();//　送信時にページのリロードを防ぎ送信処理を制御（ブラウザのデフォルトの動作をキャンセルするメソッド）
    if (!validate()) return;//　バリデーション(false を返すとreturnで送信処理を中断)
    setIsSubmitting(true);//　送信中フラグON(「送信中」状態を管理しボタン無効化へ)
    try {
      const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",{ // APIへデータを送信
        method: "POST",//データを新規送信する（POSTは新しいデータを送信)
        headers: {"Content-Type": "application/json",},//JSON形式のデータを送ることを記載
        body: JSON.stringify(formData),//送信するフォームのデータをJSON形式の文字列に変換して送信
      });
      if (!response.ok) throw new Error("Network response was not ok");//⑤ レスポンスの確認
      alert("送信しました");//　送信成功時の処理
      handleClear();//送信成功時のみフォームをクリア
      setErrors({});//エラーメッセージをリセット
    } catch (error) {// エラーが発生した場合の処理
      console.error('Error submitting form:',error);
    } finally {
      setIsSubmitting(false);//　送信処理が終わったらフラグをOFF
    }
  };
  //フォームの入力値クリア処理
  const handleClear = () => {
    //送信完了後、フォームの各項目の中身をクリア
    setFormData({ name: "",email: "",message: ""});
  };
  return(
    <div className={classes.contactForm}>
      <form onSubmit={handleSubmit}>
        <h2>問い合わせフォーム</h2>
        <div>
          <div className={classes.formColumn}>
            {/* 名前 */}
            <label htmlFor="name">
              お名前
            </label>
            <div className={classes.formFormat}>
              <input 
                type="text"
                id="name"
                maxLength="30"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {/*エラーメッセージ*/}
              {errors.name && <p className={classes.formError}>{errors.name}</p>}
            </div>
          </div>

          <div className={classes.formColumn}>
          {/*メールアドレス*/}
            <label htmlFor="email">
              メールアドレス
            </label>
            <div className={classes.formFormat}>
              <input 
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {/*エラーメッセージ*/}
              {errors.email && <p className={classes.formError}>{errors.email}</p>}
            </div>
          </div>

          <div className={classes.formColumn}>
          {/*本文*/}
            <label htmlFor="message">
              本文
            </label>
            <div className={classes.formFormat}>
              <textarea
                id="message"
                maxLength="500"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="10"
              />
              {/*エラーメッセージ*/}
              {errors.message && <p className={classes.formError}>{errors.message}</p>}
            </div>
          </div>
        
          {/*送信ボタン*/}
          <div className={classes.formBtn}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={classes.submitBtn}>送信</button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className={classes.clearBtn}>クリア</button>
          </div>
        </div>
      </form>
    </div>
  )
};
export default Contact;
