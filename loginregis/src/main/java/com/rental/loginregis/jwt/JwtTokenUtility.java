package com.rental.loginregis.jwt;

import com.rental.loginregis.model.UserInfo;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtility {

    @Value("${app.jwt.issuer-name}")
    private String ISSUER_NAME;
    @Value("${app.jwt.period-of-validity}")
    private long PERIOD_OF_VALIDITY;

    @Value("${app.jwt.secret}")
    private String JWT_SECRET_KEY;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtility.class);

    public String generateAccessToken(UserInfo userInfo){
        return Jwts.builder()
                .setSubject(userInfo.getUsername())
                .setIssuer(ISSUER_NAME)
                .setIssuedAt(new Date())
                .claim("roles", userInfo.getRoleKaryawan())
                .setExpiration(new Date(System.currentTimeMillis()+PERIOD_OF_VALIDITY))
                .signWith(SignatureAlgorithm.HS512,JWT_SECRET_KEY)
                .compact();
    }

    public Jws<Claims> parseClaims(String accessToken){
        try{
            return Jwts.parser()
                    .setSigningKey(JWT_SECRET_KEY)
                    .parseClaimsJws(accessToken);
        }catch (ExpiredJwtException e){
            LOGGER.error("JWT Expired", e.getMessage());
        }catch (IllegalArgumentException e){
            LOGGER.error("Token Is Null, Empty Or Only Whitespace",e);
        }catch (MalformedJwtException e){
            LOGGER.error("JWT Is Invalid",e);
        }catch (UnsupportedJwtException e){
            LOGGER.error("JWT Is Not Supported", e);
        }catch (SignatureException e){
            LOGGER.error("Signature Validation Failed");
        }

        return null;
    }


    public boolean validateAccessToken(String accessToken){
        if(parseClaims(accessToken) != null){
            return true;
        }else{
            return false;
        }
    }

    public String getUsername (String accessToken){

        return getSubject(accessToken);
    }

    public String getSubject (String accessToken){

        return parseClaims(accessToken).getBody().getSubject();
    }
}
