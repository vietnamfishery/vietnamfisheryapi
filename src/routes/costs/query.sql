-- Tham khảo
SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN materials m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133
                	GROUP BY c.seasonId


SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN materials m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133
                WHERE c.createdDate BETWEEN TIMESTAMP(DATE(c.createdDate)) AND ADDDATE(SUBTIME(TIMESTAMP(DATE(c.createdDate)), 1), 1)
                    GROUP BY c.createdDate
                    	HAVING c.createdDate BETWEEN TIMESTAMP(DATE(c.createdDate)) AND ADDDATE(SUBTIME(TIMESTAMP(DATE(c.createdDate)), 1), 1)

SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN materials m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133
                    GROUP BY Year(c.createdDate), month(c.createdDate), day(c.createdDate)

SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN b m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133
                    GROUP BY Year(c.createdDate), month(c.createdDate), day(c.createdDate)



SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN materials m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133 AND s.seasonUUId = 'c58b1aa5-d25f-47a4-977d-340c1f942d23'
                JOIN storages st	ON m.storageId =  st.storageId
                    GROUP BY Year(CONVERT_TZ(c.createdDate,'utc','vi-VN')), month(CONVERT_TZ(c.createdDate,'utc','vi-VN')), day(CONVERT_TZ(c.createdDate,'utc','vi-VN')), st.type


SELECT * FROM harvests h
						JOIN harvestdetails hd ON hd.harvestId = h.harvestId
                        JOIN seasonsandpond snp ON h.seasonAndPondId = snp.seasonAndPondId
                        JOIN seasons ss ON snp.seasonId = ss.seasonId AND ss.seasonUUId = '2639703e-d432-4450-bc5f-84da8ddd806a'
                        JOIN stocking tk ON tk.seasonAndPondId = snp.seasonAndPondId
                        JOIN stockingdetails tkd ON tkd.stockingId = tk.stockingId
                        JOIN breeds br ON br.breedId = tkd.breedId
              GROUP By Year(CONVERT_TZ(h.createdDate,'utc','vi-VN')), month(CONVERT_TZ(h.createdDate,'utc','vi-VN')), day(CONVERT_TZ(h.createdDate,'utc','vi-VN')), br.breedId
---------------------
-- Lấy
---------------------
SELECT *, sum(m.quantity*m.unitPrice) totals
FROM coupons c	JOIN materials m	ON c.couponId = m.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133 AND s.seasonUUId = 'c58b1aa5-d25f-47a4-977d-340c1f942d23'
                JOIN storages st	ON m.storageId =  st.storageId
                    GROUP BY Year(TIMESTAMP(c.createdDate)), month(TIMESTAMP(c.createdDate)), day(TIMESTAMP(c.createdDate)), st.type;

SELECT *, sum(b.quantity*b.unitPrice) totals
FROM coupons c	JOIN boughtbreeddetails b	ON c.couponId = b.couponId
				JOIN seasons s 		ON c.seasonId = s.seasonId AND s.userId = 133
                JOIN breeds br	ON br.breedId =  b.breedId
                    GROUP BY Year(c.createdDate), month(c.createdDate), day(c.createdDate), br.breedId;

