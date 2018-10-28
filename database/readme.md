File: fisheriesdatabase.ver9.0.sql
1. Lấy pondDiary theo ngày (của vụ nào của ao nào JOIN với seasonAndPond)

    `SELECT * FROM seasonsandpond ssp join ponddiary pd on ssp.seasonAndPondId = pd.seasonAndPondId 								
		join ponds p on ssp.pondId = s.pondId                                  
		join userroles usr on usr.bossId = p.userId                 
		WHERE pd.createdDate = "ngày tháng năm cụ thể truyền lên"                         
		and (p.userId = 104 or (usr.userId = 103 and roles = 4))`

2. Lấy pondDiary theo tháng (của vụ nào của ao nào JOIN với seasonAndPond)

    gắn seasonId vào nhật ký của ngày:
    `SELECT * FROM seasonsandpond ssp join ponddiary pd on ssp.seasonAndPondId = pd.seasonAndPondId
								join seasons s on ssp.seasonId = s.seasonId
								join userroles usr on usr.bossId = s.userId
            WHERE month(pd.createdDate) = month(NOW()) (month(Now()) truyền từ code qua)
                and year(pd.createdDate) = year(NOW()) (year(Now()) truyền từ code qua)
                and (s.userId = 104 or (usr.userId = 103 and roles = 4))`

3. Lấy Stocking theo vụ ao

`SELECT * FROM stocking sk join stockingdetails skt on sk.stockingid = skt.stockingid 
						join seasonsandpond ssp on sk.seasonAndPondId = ssp.seasonAndPondId
						JOIN seasons ss on ssp.seasonId = ss.seasonId 
                        join userroles ur on ss.userId = ur.bossId
         WHERE ss.seasonId=? and ssp.pondId=? and (ss.userId =? or ur.userId=?)`

4. Lấy Harverst theo vụ ao

`SELECT * FROM harvests hv join harvestdetails hvt on hv.harvestid = hvt.harvestid 
						join seasonsandpond ssp on hv.seasonAndPondId = ssp.seasonAndPondId
						JOIN seasons ss on ssp.seasonId = ss.seasonId 
                        join userroles ur on ss.userId = ur.bossId
         WHERE ss.seasonId=? and ssp.pondId=? and (ss.userId =? or ur.userId=?)`

5. Nhập/Xuất Storage và Material



6. Nhập xuất breed.
7. chuẩn bị ao vụ + ao.


8. tăng trưởng vụ + ao.
9. chất thải vụ + ao.