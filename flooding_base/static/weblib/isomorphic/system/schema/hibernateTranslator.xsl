<?xml version="1.0"?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
    <xsl:output 
        method="xml" 
        indent="yes"
        doctype-public="-//Hibernate/Hibernate Mapping DTD 3.0//EN http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd"
    />

    <xsl:template match="/">
        <hibernate-mapping>
        <xsl:element name="class">
            <xsl:attribute name="entity-name"><xsl:value-of select="/DataSource/@ID"/></xsl:attribute>
            <xsl:if test="/DataSource/@tableName">
                <xsl:attribute name="table"><xsl:value-of select="/DataSource/@tableName"/></xsl:attribute>
            </xsl:if>

            <xsl:for-each select="/DataSource/fields/field">
                <xsl:variable name="tagName">
                    <xsl:choose>
                        <xsl:when test="@primaryKey = 'true'">id</xsl:when>
                        <xsl:otherwise>property</xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <xsl:element name="{$tagName}">
                    <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>

                    <xsl:variable name="type">
                        <xsl:choose>
                            <!-- allow an explicit nativeType, passed straight through.
                                 Necessary because we otherwise default unrecognized types to
                                 string, since you are allowed to set @type to values the
                                 server doesn't understand -->
                            <xsl:when test="@nativeType">
                                <xsl:value-of select="@nativeType"/>
                            </xsl:when>

                            <!-- float to double: ISC creates a Java Double for all floating
                                 point types, plus original ISC SQL layer used to create
                                 doubles for some databases -->
                            <xsl:when test="@type = 'float'">double</xsl:when>
                            <xsl:when test="@type = 'double'">double</xsl:when>
                            <xsl:when test="@type = 'decimal'">double</xsl:when>

                            <xsl:when test="@type = 'number'">integer</xsl:when>
                            <xsl:when test="@type = 'int'">integer</xsl:when>
                            <xsl:when test="@type = 'integer'">integer</xsl:when>
                            <xsl:when test="@type = 'intEnum'">integer</xsl:when>

                            <xsl:when test="@type = 'date'">date</xsl:when>
                            <xsl:when test="@type = 'datetime'">timestamp</xsl:when>
                            <xsl:when test="@type = 'time'">time</xsl:when>

                            <xsl:when test="@type = 'binary'">binary</xsl:when>
                            <xsl:when test="@type = 'blob'">binary</xsl:when>

                            <xsl:when test="@type = 'boolean'">boolean</xsl:when>

                            <xsl:when test="@type = 'sequence'">long</xsl:when>

                            <xsl:when test="@type = 'enum'">string</xsl:when>
                            <xsl:when test="@type = 'string'">
                                <xsl:choose>
                                    <xsl:when test="@length &gt; 1999">text</xsl:when>
                                    <xsl:otherwise>string</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:when test="@type = 'text'">
                                <xsl:choose>
                                    <xsl:when test="@length &gt; 1999">text</xsl:when>
                                    <xsl:otherwise>string</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>

                            <!-- otherwise default to string -->
                            <xsl:otherwise>
                                <xsl:choose>
                                    <xsl:when test="@length &gt; 1999">text</xsl:when>
                                    <xsl:otherwise>string</xsl:otherwise>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
    
                    <xsl:attribute name="type"><xsl:value-of select="$type"/></xsl:attribute>

                    <xsl:if test="@primaryKey = 'true'">
                        <xsl:choose>
                            <xsl:when test="@type = 'sequence'">
                                <generator class="native"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <generator class="assigned"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:if>

                </xsl:element>
            </xsl:for-each>
        </xsl:element>
        </hibernate-mapping>
    </xsl:template>
</xsl:stylesheet>
