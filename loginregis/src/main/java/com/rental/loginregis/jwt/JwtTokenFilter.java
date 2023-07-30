package com.rental.loginregis.jwt;

import com.rental.loginregis.model.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import com.rental.loginregis.model.Role;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtility jwtTokenUtility;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(hasAuthorizationBearer(request)){
            String accessToken = getAccessToken(request);
            if(jwtTokenUtility.validateAccessToken(accessToken)){
                setAuthenticationContext(accessToken, request);
            }
        }

        filterChain.doFilter(request,response);
    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserInfo userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        return token;
    }

    private boolean hasAuthorizationBearer(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if(ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")){
            return false;
        }
        return true;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenFilter.class);

    private UserInfo getUserDetails(String token){
        UserInfo userInfoDetails = new UserInfo();
        Jws<Claims> claimsJws = jwtTokenUtility.parseClaims(token);
        Claims claimsBody = claimsJws.getBody();
        String username = jwtTokenUtility.getUsername(token);
        userInfoDetails.setUsername(username);

        String roles = (String) claimsBody.get("roles");
        
        roles = roles.replace("[", "").replace("]", "");
        String[] roleNames = roles.split(",");
        
        for (String aRoleName : roleNames) {
            userInfoDetails.addRole(new Role(aRoleName));
            LOGGER.info("-> "+aRoleName);
        }
        

        return userInfoDetails;
    }
}
