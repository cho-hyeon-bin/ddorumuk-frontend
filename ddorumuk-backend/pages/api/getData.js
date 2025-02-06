import mysql from "mysql2";

const db = mysql.createConnection({
  host: "project-db-cgi.smhrd.com",
  port: 3307,
  user: "syp_study", // DB 사용자명
  password: "smhrd", // DB 비밀번호
  database: "syp_study", // 사용할 데이터베이스 이름
});

db.connect((err) => {
	if (err) {
		console.error("DB 연결 실패:", err); return;
	}
	console.log("DB 연결 성공");
});

export default async function handler(req, res) {
  if (req.method === "GET") {
	try {
		const [results] = await db.promise().query("SELECT * FROM Food");
		res.status(200).json(results);
	} catch (err) {
		console.error("DB 오류:", err);
		res.status(500).json({ error: "데이터 조회 실패" });
	}
	} else {
		res.status(405).json({ error: "허용되지 않은 메서드" });
	}
}