SELECT * FROM seasonsandpond ssp join ponddiary pd on ssp.seasonAndPondId = pd.seasonAndPondId join seasons s on ssp.seasonId = s.seasonId WHERE month(pd.createdDate) = month(NOW()) (month(Now()) truyền từ code qua) and year(pd.createdDate) = year(NOW()) (year(Now()) truyền từ code qua) and s.userId = 104


SELECT * FROM seasonsandpond ssp join ponddiary pd on ssp.seasonAndPondId = pd.seasonAndPondId join ponds p on ssp.pondId = s.pondId join userroles usr on usr.bossId = p.userId WHERE pd.createdDate = "ngày tháng năm cụ thể truyền lên" and p.userId = 104 or (usr.userId = 103 and roles = 4)